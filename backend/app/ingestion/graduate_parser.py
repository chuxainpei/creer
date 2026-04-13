from pydantic import BaseModel


class GraduateRecord(BaseModel):
    major: str
    year: int
    destination_type: str
    institution_company: str
    salary_range: str


def build_graduate_metadata(record: GraduateRecord) -> dict:
    return {
        "source_type": "graduate_reference",
        "major": record.major,
        "year": record.year,
        "institution_company": record.institution_company,
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
