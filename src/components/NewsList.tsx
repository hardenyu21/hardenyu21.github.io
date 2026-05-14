import type { NewsItem } from '../data/news';

type NewsListProps = {
  items: NewsItem[];
};

export function NewsList({ items }: NewsListProps) {
  return (
    <ol className="news-list">
      {items.map((item) => (
        <li key={`${item.date}-${item.text}`}>
          <time>{item.date}</time>
          {item.href ? <a href={item.href}>{item.text}</a> : <span>{item.text}</span>}
        </li>
      ))}
    </ol>
  );
}
