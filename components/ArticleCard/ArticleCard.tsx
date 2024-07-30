import { Article } from '@/app/types';
import Image from 'next/image';

const ArticleCard = ({
  title,
  description,
  author,
  urlToImage,
  source,
  url,
  content,
}: Article) => {
  return (
    <article>
      <h2>{title}</h2>
      <p>{description}</p>
      {urlToImage && (
        <Image
          src={urlToImage}
          alt={title}
          width={600}
          height={400}
        />
      )}
      <p>{content}</p>
    </article>
  );
};

export default ArticleCard;
