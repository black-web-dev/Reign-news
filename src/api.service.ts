export interface INews {
  title: string;
  author: string;
  createdAt: Date;
  url: string;
  id: string;
  category: string;
}

export interface IInfo {
  maxPage: number;
}

export function fetchNews(category: string, page = 0, perPage = 20): Promise<{ data: INews[]; info: IInfo }> {
  const url = `https://hn.algolia.com/api/v1/search_by_date?query=${category.toLocaleLowerCase()}&page=${page}&hitsPerPage=${perPage}`;
  return new Promise(resolve => {
    fetch(url)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        const list: INews[] = data.hits.map(
          (item: {
            story_title: string;
            author: string;
            created_at: string | number | Date;
            story_url: string;
            story_id: string | number;
          }) => ({
            title: item.story_title,
            author: item.author,
            createdAt: new Date(item.created_at),
            url: item.story_url,
            id: `${item.story_id}_${item.author}_${item.created_at}`,
            category,
          }),
        );
        resolve({ data: list, info: { maxPage: data.nbPages } });
      });
  });
}
