import { FC } from 'react';
import Link from 'next/link';

interface IBreadcrumb{
  pageTitle: string,
  currentPageBread?: boolean,
  parents?: {
    title: string,
    path: string
  }[]
}

export const Breadcrumb: FC<IBreadcrumb> = ({ pageTitle , parents, currentPageBread=true}) => {
  return(
    <div className={'py-12 bg-[#fbfbfb]'}>
      <div className='container'>
        <div className='flex flex-wrap justify-between gap-6'>
          <h2 className={'text-2xl font-bold'}>{pageTitle}</h2>

          <ul className='flex flex-wrap items-center text-sm gap-4'>
            <li>
              <Link href={'/'}>
                <span className={'cursor-pointer'}>DOMOV</span>
              </Link>
            </li>
            {parents?.map((parent, index) => (
              <li key={index} className={'flex items-center gap-4'}>
                <span>
                  <i className="fas fa-angle-right"></i>
                </span>
                <Link href={parent.path}>
                  <span className={'cursor-pointer'}>{parent.title}</span>
                </Link>
              </li>
            ))}
            {currentPageBread && (
              <li className={'flex items-center gap-4'}>
                <span>
                  <i className="fas fa-angle-right"></i>
                </span>
                <span className={'font-bold'}>{pageTitle}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}