import EntryModule from '@/src/components/home/EntryModule';

const hotTopics = ['院校推荐怎么分层', '岗位方向怎么取舍', '秋招时间线怎么排', '简历投递策略', '转方向补能力清单', '风险点提前识别'];

export default function HomePage() {
  return <EntryModule hotTopics={hotTopics} />;
}
