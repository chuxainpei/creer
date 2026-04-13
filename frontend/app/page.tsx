import EntryModule from '@/src/components/home/EntryModule';

const hotTopics = ['三方协议怎么办', '双选会报名入口', '简历优化建议', '档案去向查询', '求职补贴申请', '公务员/选调提醒'];

export default function HomePage() {
  return <EntryModule hotTopics={hotTopics} />;
}
