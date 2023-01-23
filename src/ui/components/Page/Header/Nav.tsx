import Link from 'next/link';
import classNames from 'classnames';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export interface IMenuItem {
  title: string;
  link: string;
  icon?: string;
  isCTA?: boolean;
  children?: IMenuItem[];
}

export const menu: IMenuItem[] = [
  {
    title: 'home',
    link: '/',
  },
  {
    title: 'eduOnline',
    link: '/demo-lesson',
    children: [
      {
        title: 'demo_lesson',
        link: '/demo-lesson',
      },
      {
        title: 'students',
        link: '/students',
      },
      {
        title: 'parents',
        link: '/parents',
      },
    ],
  },
  {
    title: 'offer',
    link: '/offer',
  },
  {
    title: 'school',
    link: '/varnost-na-internetu',
  },
  {
    title: 'points',
    link: '/learning-points',
  },
  {
    title: 'about',
    link: '/company-vision',
    children: [
      {
        title: 'vision',
        link: '/company-vision',
      },
      {
        title: 'team',
        link: '/team',
      },
    ],
  },
  {
    title: 'enter',
    link: 'https://yuno.education',
    icon: 'fa fa-share',
    isCTA: true,
  },
];

const MenuItem: FC<{ menu_item: IMenuItem }> = ({ menu_item }) => {
  const { t } = useTranslation('header');
  const router = useRouter();
  const isCurrent = router.pathname === menu_item.link;

  return (
    <div
      className={classNames('group cursor-pointer font-bold relative', {
        'text-gray-500 hover:text-dark': !isCurrent && !menu_item.isCTA,
        'text-danger': menu_item.isCTA,
        'text-primary': isCurrent,
      })}
    >
      <div className={'flex gap-2 p-4 lg:leading-10 uppercase'}>
        <Link href={menu_item.link}>
          <span>
            {menu_item.icon && (
              <span className={'pr-2'}>
                <i className={menu_item.icon}></i>
              </span>
            )}
            <span>{t('menu.' + menu_item.title)}</span>
          </span>
        </Link>

        {menu_item.children && (
          <span>
            <i className="fas fa-chevron-down"></i>
          </span>
        )}
      </div>

      {menu_item.children && (
        <ul
          className={
            'z-0 opacity-0 group-hover:opacity-100 max-h-0 top-full py-3 px-5 left-0 w-52 absolute ' +
            'bg-gray-800 transition-all group-hover:max-h-60 duration-700 ease-in-out overflow-hidden'
          }
        >
          {menu_item.children?.map((item, index) => (
            <li key={index}>
              <Link href={item.link}>
                <span
                  className={
                    'cursor-pointer block px-5 py-3 border-b border-transparent font-normal text-gray-300 ' +
                    'leading-relaxed transition hover:border-gray-600 hover:text-white'
                  }
                >
                  <span
                    className={classNames({
                      'font-bold': router.pathname === item.link,
                    })}
                  >
                    {t('menu.' + item.title)}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const Nav: FC = () => {
  return (
    <div>
      <div className="container">
        <div className="rounded-lg shadow-nav flex items-center justify-between">
          <ul className={'pl-4 flex items-start'}>
            {menu.map((menu_item, index) => (
              <li key={index}>
                <MenuItem menu_item={menu_item} />
              </li>
            ))}
          </ul>

          <div className={'flex'}>
            <a target={'_blank'} rel={'noreferrer nofollow'} href={process.env.NEXT_PUBLIC_FACEBOOK_URL}>
              <div className={'cursor-pointer box-content w-8 text-center p-4 leading-10 border-l'}>
                <i className="fab fa-facebook-f"></i>
              </div>
            </a>
            <a target={'_blank'} rel={'noreferrer nofollow'} href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}>
              <div className={'cursor-pointer box-content w-8 text-center p-4 leading-10 border-l'}>
                <i className="fab fa-instagram"></i>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
