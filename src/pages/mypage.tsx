import { API_URL, logoutAPI } from '@api';
import useAuth from '@hooks/useAuth';
import useUser from '@hooks/useUser';
import { Navbar, NavTitle, Page, List, ListItem } from 'framework7-react';
import React, { useCallback } from 'react';

const MyPage = () => {
  const { currentUser, isAuthenticated, unAuthenticateUser } = useAuth();
  const { currentUserInfo } = useUser();

  const logoutHandler = useCallback(async () => {
    try {
      await logoutAPI();
    } catch (e) {
      console.log(e);
    } finally {
      unAuthenticateUser();
    }
  }, [unAuthenticateUser]);

  return (
    <Page name="mypage">
      <Navbar>
        <NavTitle>마이페이지</NavTitle>
      </Navbar>
      <div className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <div className="flex-shrink-0">
              <a href={`/users/${currentUser?.id}`}>
                <div className="relative">
                  {currentUser?.image_path ? (
                    <img className="h-24 w-24 rounded-full" src={API_URL + currentUser?.image_path} alt="" />
                  ) : (
                    <i
                      className="h-24 w-24 rounded-full las la-user-circle"
                      style={{ fontSize: '96px', color: 'gray' }}
                    />
                  )}
                  <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" />
                </div>
              </a>
            </div>
            <div className="w-full">
              <a href={`/users/${currentUser?.id}`}>
                <h1 className="text-xl font-bold text-gray-900">
                  {isAuthenticated ? currentUserInfo.name : 'Insomenia'}
                </h1>
              </a>
            </div>
            <a href={`/users/${currentUser?.id}`}>
              <i className="las la-angle-right" style={{ fontSize: '24px', color: 'gray' }} />
            </a>
          </div>
        </div>
        <div className="pt-8 grid grid-flow-col auto-cols-max grid-cols-3 gap-4 text-center">
          <div className="text-center">
            <a href="/carts">
              <i className="mb-2 las la-shopping-cart" style={{ fontSize: '42px', color: 'lightgray' }} />
              <br />
              <span className="text-sm text-gray-600">장바구니</span>
            </a>
          </div>
          <div className="text-center">
            <a href="/orders">
              <i className="mb-2 las la-file-invoice" style={{ fontSize: '42px', color: 'lightgray' }} />
              <br />
              <span className="text-sm text-gray-600">주문</span>
            </a>
          </div>
          <div className="text-center">
            <a href="/interests" className="text-sm text-gray-600">
              <i className="mb-2 lar la-heart" style={{ fontSize: '42px', color: 'lightgray' }} />
              <br />
              관심
            </a>
          </div>
        </div>
        <div className="bg-white overflow-hidden sm:rounded-md">
          <List medial-list>
            <ListItem title="회원 정보 수정" subtitle="Beatles" link={`/users/${currentUser?.id}`}>
              <i className="la la-pencil-square" slot="media" />
            </ListItem>
            <ListItem title="주문 목록" subtitle="Beatles" link="/orders">
              <i className="la la-file-text" slot="media" />
            </ListItem>
            <ListItem title="장바구니 목록" subtitle="Beatles" link="/carts">
              <i className="la la-shopping-cart" slot="media" />
            </ListItem>
            <ListItem title="관심 목록" subtitle="Beatles" link="/interests">
              <i className="lar la-heart" slot="media" />
            </ListItem>
            {isAuthenticated ? (
              <ListItem title="로그아웃" subtitle="Beatles" link="#" onClick={logoutHandler}>
                <i className="la la-unlock-alt" slot="media" />
              </ListItem>
            ) : null}
          </List>
        </div>
      </div>
      <footer className="bg-gray-100 mt-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-xs text-gray-400">
              <a href="#">이용약관 </a> | <a href="#">개인정보처리방침</a>
            </p>

            <p className="mt-2 text-xs text-gray-400">&copy; 2021 insomenia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </Page>
  );
};

export default React.memo(MyPage);
