from __future__ import annotations

from pathlib import Path

import pandas as pd
from pydantic import BaseModel


SUPPORTED_GRADUATE_EXTENSIONS = {".csv", ".xls", ".xlsx"}
COLUMN_ALIASES = {
    "major": ("major", "专业", "所属专业", "毕业专业"),
    "year": ("year", "毕业年份", "年份", "届别", "毕业届别"),
    "destination_type": ("destination_type", "去向类型", "毕业去向", "就业类型"),
    "institution_company": ("institution_company", "单位名称", "院校/单位", "单位/院校", "去向单位"),
    "salary_range": ("salary_range", "薪资范围", "薪资", "月薪", "薪酬区间"),
}


class GraduateRecord(BaseModel):
    major: str
    year: int
    destination_type: str = "就业"
    institution_company: str
    salary_range: str = "未提供"


def _resolve_columns(columns: list[str]) -> dict[str, str]:
    mapping: dict[str, str] = {}
    for canonical, aliases in COLUMN_ALIASES.items():
        for candidate in columns:
            if candidate.strip() in aliases:
                mapping[canonical] = candidate
                break
    return mapping


def parse_graduate_file(file_path: Path) -> list[GraduateRecord]:
    if file_path.suffix.lower() not in SUPPORTED_GRADUATE_EXTENSIONS:
        raise ValueError(f"Unsupported graduate data format: {file_path.suffix}")

    if file_path.suffix.lower() == ".csv":
        frame = pd.read_csv(file_path)
    else:
        frame = pd.read_excel(file_path)

    mapping = _resolve_columns([str(column) for column in frame.columns])
    required = {"major", "year", "institution_company"}
    missing = required - set(mapping)
    if missing:
        raise ValueError(f"Missing required columns: {sorted(missing)}")

    records: list[GraduateRecord] = []
    for _, row in frame.iterrows():
        major = str(row[mapping["major"]]).strip()
        institution = str(row[mapping["institution_company"]]).strip()
        if not major or not institution or major.lower() == "nan" or institution.lower() == "nan":
            continue

        year_value = row[mapping["year"]]
        try:
            year = int(float(year_value))
        except (TypeError, ValueError):
            continue

        destination = (
            str(row[mapping["destination_type"]]).strip()
            if "destination_type" in mapping and str(row[mapping["destination_type"]]).strip()
            else "就业"
        )
        salary = (
            str(row[mapping["salary_range"]]).strip()
            if "salary_range" in mapping and str(row[mapping["salary_range"]]).strip()
            else "未提供"
        )
        records.append(
            GraduateRecord(
                major=major,
                year=year,
                destination_type=destination,
                institution_company=institution,
                salary_range=salary,
            )
        )
    return records


def build_graduate_metadata(record: GraduateRecord) -> dict:
    return {
        "source_type": "graduate_reference",
        "major": record.major,
        "year": record.year,
        "institution_company": record.institution_company,
        "destination_type": record.destination_type,
    }


def build_graduate_chunk(record: GraduateRecord) -> dict:
    text = (
        f"{record.year}届 {record.major} 毕业去向："
        f"{record.destination_type}，单位/院校：{record.institution_company}，"
        f"薪资范围：{record.salary_range}"
    )
    return {
        "text": text,
        "metadata": build_graduate_metadata(record),
    }


def build_graduate_chunks_from_file(file_path: Path) -> list[dict]:
    return [build_graduate_chunk(record) for record in parse_graduate_file(file_path)]
