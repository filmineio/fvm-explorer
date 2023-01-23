import Link from "next/link";
import classNames from "classnames";
import {FC} from "react";
import {IMenuItem, menu} from "./Nav";
import { useTranslation } from 'next-i18next';

const MenuItem: FC<{menu_item: IMenuItem, index: number}> = ({menu_item, index}) => {
  const { t } = useTranslation('header');

  return (
    <Link href={menu_item.link}>
      <div className={classNames('group cursor-pointer relative text-base border-gray-700 hover:text-white', {
        'border-t': index != 0
      })}>
        <div className={'flex items-center justify-between gap-2 p-4 uppercase'}>
          <span>
            {menu_item.icon && (
              <i className={menu_item.icon}></i>
            )}
            <span>{t('menu.'+menu_item.title)}</span>
          </span>
          {menu_item.children && (
            <span><i className="fas fa-chevron-down"></i></span>
          )}
        </div>
        {menu_item.children && (
          <div className={''}>
            <ul className={`z-0 opacity-0 group-hover:opacity-100 max-h-0 transition-all ` +
              `group-hover:max-h-60 duration-700 ease-in-out pl-8 bg-gray-800`}>
              {menu_item.children?.map((item, index) => (
                <li key={index}>
                  <Link href={item.link}>
                    <span className={'cursor-pointer block p-4 border-t border-gray-700 font-normal text-gray-300 ' +
                      'leading-relaxed transition hover:text-white'}>
                      <span>{t('menu.'+item.title)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Link>
  )
}

export const NavMobile: FC = () => {
  return (
    <div className={'z-10 w-full text-gray-300 py-10 h-full'}>
      <div className="container px-8">
        <ul className={'flex flex-col'}>
          {menu.map((menu_item, index) => (
            <li key={index}>
              <MenuItem menu_item={menu_item} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}