import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
import css from './Pagination.module.css';

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

interface PaginationProps {
  pageCount: number;
  pageRangeDisplayed: number;
  marginPagesDisplayed: number;
  onPageChange: (data: { selected: number }) => void;
  forcePage: number;
  containerClassName: string;
  activeClassName: string;
  nextLabel: string;
  previousLabel: string;
}

export default function Pagination(props: PaginationProps) {
  
  const {
    pageCount,
    pageRangeDisplayed,
    marginPagesDisplayed,
    onPageChange,
    forcePage,
    containerClassName = css.pagination,
    activeClassName = css.active,
    nextLabel,
    previousLabel
  } = props;

  return (
        <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={marginPagesDisplayed}
        onPageChange={({ selected }) => onPageChange({ selected })}
        forcePage={forcePage}
        containerClassName={containerClassName}
        activeClassName={activeClassName}
        nextLabel={nextLabel}
        previousLabel={previousLabel}
    />
  );
}
