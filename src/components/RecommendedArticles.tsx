import Link from 'next/link';

export default function RecommendedArticles() {
  const articles = [
    {
      title: "Как установить здоровые границы в отношениях",
      link: "/blog-details/healthy-boundaries",
    },
    {
      title: "5 советов для эффективного общения",
      link: "/blog-details/communication-tips",
    },
  ];

  return (
    <div>
      <ul className="list-none p-0">
        {articles.map((article, index) => (
          <li key={index} className="mb-2">
            <Link
              href={article.link}
              className="text-[14px] sm:text-[15px] leading-[1.3] !text-[#143B64] hover:underline"
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}