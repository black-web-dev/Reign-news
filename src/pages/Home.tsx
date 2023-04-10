import React, { useCallback, useEffect, useState } from 'react';
import { fetchNews, INews } from '../api.service';
import NewsCard from '../comoponents/NewsCard';
import DropdownList, { DropDownOption } from '../comoponents/ui-kit/DropdownList';
import Pagination from '../comoponents/ui-kit/Pagination';
import TabControl from '../comoponents/ui-kit/TabControl';
import { FavType } from '../enums';
import {
  addToStarList,
  getNewsCategoryIndex,
  getStarList,
  getStarListByCategory,
  removeFromStarList,
  setNewsCategoryIndex,
} from '../local-storage.service';

const newsCategories: DropDownOption[] = [
  { value: '', label: 'Select Your News' },
  { value: 'Angular', icon: `/icons/angular.png` },
  { value: 'React', icon: `/icons/react.png` },
  { value: 'Vue', icon: `/icons/vue.png` },
];
const perPage = 20;

export default function Home() {
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(1);
  const [tab, setTab] = useState(FavType.All);
  const [news, setNews] = useState<INews[]>([]);
  const [loading, setLoading] = useState(false);
  const [starList, setStarList] = useState(getStarList());
  const [categoryIndex, setCategoryIndex] = useState<number>(getNewsCategoryIndex());

  useEffect(() => {
    setNewsCategoryIndex(categoryIndex);
  }, [categoryIndex]);

  useEffect(() => {
    setLoading(true);

    if (categoryIndex === 0) {
      setNews([]);
      setMaxPage(1);
      setLoading(false);
      return;
    }
    if (tab === FavType.All) {
      fetchNews(newsCategories[categoryIndex].value, page, perPage)
        .then(({ data, info: { maxPage } }) => {
          setNews(data);
          setMaxPage(maxPage);
          setLoading(false);
        })
        .catch(() => {
          setNews([]);
          setMaxPage(1);
          setLoading(false);
        });
    } else {
      const {
        data,
        info: { maxPage },
      } = getStarListByCategory(newsCategories[categoryIndex].value, page, perPage);
      setNews(data);
      setMaxPage(maxPage);
      setLoading(false);
    }
  }, [categoryIndex, page, tab]);

  const handleStar = (item: INews, starred: boolean) => () => {
    let list;
    if (!starred) {
      list = addToStarList(item);
    } else {
      list = removeFromStarList(item);
    }
    console.log(list, starred);
    setStarList(list);
  };

  const handleTabChange = useCallback((tab: number) => {
    setPage(0);
    setTab(tab);
  }, []);

  return (
    <div className="mx-auto">
      <header className="px-10 lg:px-40 pt-11 pb-10 bg-gradient-to-b from-gray-900 to-white border-b border-slate-50/10">
        <h2 className="font-baskerville text-3xl text-gray-300">HACKER NEWS</h2>
      </header>
      <div className="px-10 lg:px-40">
        <div className="flex justify-center pt-16 pb-14">
          <TabControl labels={['All', 'My faves']} selected={tab} tabChanged={handleTabChange} />
        </div>
        <div className="mb-9">
          <DropdownList options={newsCategories} selected={categoryIndex} selectionChanged={setCategoryIndex} />
        </div>
        {loading ? (
          <div className="text-center">Loading ...</div>
        ) : (
          <>
            {news.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-6">
                  {news.map(item => {
                    const starred = !!starList.find(_item => _item.id === item.id);
                    return (
                      <NewsCard key={item.id} {...item} starred={starred} toggleStar={handleStar(item, starred)} />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center">No data display</div>
            )}
          </>
        )}
        {news.length > 0 && <Pagination className="my-20" page={page} maxPage={maxPage} pageChanged={setPage} />}
      </div>
    </div>
  );
}
