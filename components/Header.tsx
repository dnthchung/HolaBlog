'use client';

import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';
import Logo from '@/data/logo.svg';
import Link from './Link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import SearchButton from './SearchButton';

const Header = () => {
  return (
    <header
      className={`border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 ${
        siteMetadata.stickyNav ? 'sticky top-0 z-50' : ''
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Left Side: Logo & Brand */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            aria-label={siteMetadata.headerTitle}
            className="flex items-center gap-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
              <Logo className="h-5 w-5" />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden text-sm font-semibold tracking-tight text-gray-900 sm:block dark:text-gray-100">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </Link>

          {/* Navigation Links - Kiểu GitHub Tab */}
          <nav className="ml-2 hidden items-center gap-1 md:flex">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                >
                  {link.title}
                </Link>
              ))}
          </nav>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-2">
          {/* Search Button với style phím tắt (K) giống GitHub */}
          <div className="flex items-center pr-2">
            <SearchButton />
          </div>

          {/* Nhóm các nút tiện ích với khoảng cách và gạch dọc phân cách */}
          <div className="flex items-center gap-3 border-l border-gray-200 pl-4 dark:border-gray-800">
            <div className="hover:text-primary-500 flex items-center transition-transform active:scale-95">
              <ThemeSwitch />
            </div>

            <div className="sm:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
