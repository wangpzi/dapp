import { useEffect, useState } from 'react';
import './Home.css'; // 我们需要创建这个CSS文件

interface ListItem {
  name: string;
  level: string;
}

interface ApiResponse {
  data: {
    item: string;
    result: (ListItem | null)[];
  }
}

const HomePage = () => {
  const [list, setList] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/list');
        if (!response.ok) {
          throw new Error('请求失败');
        }
        const data: ApiResponse = await response.json();
        // 过滤掉 null 值并设置结果数组
        setList(data.data.result.filter((item): item is ListItem => item !== null));
      } catch (err) {
        setError(err instanceof Error ? err.message : '发生错误');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>错误: {error}</div>;
  }

  return (
    <>
      <h1 className="home-title">我的技能列表</h1>
      <div className="list-container">
        {list.map((item, index) => (
          <div key={index} className="list-item">
            <h3 className="skill-name">{item.name}</h3>
            <p className="skill-level">
              <span className="level-label">技能等级：</span>
              <span className="level-stars">{item.level}</span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
