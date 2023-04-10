import { IInfo, INews } from './api.service';

const STARRED_LIST = 'starred-list';
const SELECTED_NEWS_CATEGORY_KEY = 'news-category';

export function getStarList(): INews[] {
  const rawList = localStorage.getItem(STARRED_LIST) || '[]';
  return JSON.parse(rawList);
}

export function getStarListByCategory(category: string, page: number, perPage: number): { data: INews[]; info: IInfo } {
  console.log(page, perPage, page * perPage);
  const list = getStarList();
  const data = list.filter(item => item.category === category);
  const maxPage = Math.ceil(data.length / perPage);
  page = Math.min(maxPage, page);
  const start = page * perPage;
  const end = start + perPage;
  return { data: data.slice(start, end), info: { maxPage } };
}

export function putStarList(list: INews[]) {
  localStorage.setItem(STARRED_LIST, JSON.stringify(list));
}

export function addToStarList(item: INews): INews[] {
  const list = getStarList();
  if (list.find(_item => _item.id === item.id)) {
    return list;
  }
  list.push(item);
  putStarList(list);
  return list;
}

export function removeFromStarList(item: INews): INews[] {
  const list = getStarList().filter(_item => _item.id !== item.id);
  putStarList(list);
  return list;
}

export function getNewsCategoryIndex(): number {
  const rawIndex = localStorage.getItem(SELECTED_NEWS_CATEGORY_KEY) || '0';
  return parseInt(rawIndex);
}

export function setNewsCategoryIndex(categoryIndex: number): void {
  localStorage.setItem(SELECTED_NEWS_CATEGORY_KEY, `${categoryIndex}`);
}
