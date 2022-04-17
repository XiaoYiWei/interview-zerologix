# 開發過程紀錄

- CRA預設的版本升級到18, 但@types/react的相應版本(18.0.0) 有個breaking change會導致ReactQuery的```<QueryProvider/>```報錯.
  > 詳見 [原作者的說明](https://solverfox.dev/writing/no-implicit-children/), 主要是修改了[過量Props]的問題, 移除掉React.FC內建children.
- 發現React-Router升級到v5, 在使用方式與過去有些變動. 整體有變得比較容易閱讀好維護, 但需要點時間適應.
- 做[課程清單]與[已註冊的課程清單]時, 因為沒注意到API有分開提供, 所以多花了一些時間重構/改寫. (2H)
- 這次作業可以使用React-Query, 所以第一次嘗試使用 useInfiniteQuery.
- 登入API在實作登入功能時, 發現走不通. 所以耽誤了一陣子...,因此錯誤訊息目前有兩種, 帳號密碼錯誤(422)或其它.
