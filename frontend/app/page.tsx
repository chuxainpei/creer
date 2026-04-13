import EntryModule from '@/src/components/home/EntryModule';

const hotTopics = ['三方协议', '双选会', '简历优化', '档案去向', '求职补贴', '公务员/选调'];

export default function HomePage() {
  return <EntryModule hotTopics={hotTopics} />;
}
