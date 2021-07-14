import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

Filter.propTypes = {
  categories: PropTypes.array,
  onFilterChange: PropTypes.func,
};

Filter.defaultProps = {
  categories: [],
  onFilterChange: null,
};

function Filter(props) {
  const { categories, onFilterChange } = props;
  const [filter, setFilter] = useState({
    rating: null,
    categoryId: null,
  });
  const filterRef = useRef(filter);

  const handleOncategoryId = (categoryId) => {
    if (filterRef.current) filterRef.current = null;
    if (filter.categoryId === categoryId) filterRef.current = { categoryId: null };
    else filterRef.current = { categoryId: categoryId };

    setFilter(filterRef.current);

    if (onFilterChange) {
      onFilterChange(filterRef.current);
    }
  };

  const handleOnRating = (rating) => {
    if (filterRef.current) filterRef.current = null;
    if (filter.rating === rating) filterRef.current = { rating: null };
    else filterRef.current = { rating: rating };

    setFilter(filterRef.current);

    if (onFilterChange) {
      onFilterChange(filterRef.current);
    }
  };

  return (
    <div className="filter">
      <section className="filter__group">
        <h3 className="filter__group__name">Thương hiệu</h3>
        <ul className="filter__group__list">
          {categories.map((category) => {
            return (
              <li className="filter__group__item" key={category.id}>
                <input
                  type="checkbox"
                  id={category.id}
                  className="lessDesktop filter__group__checkbox"
                  onClick={() => {
                    handleOncategoryId(category.id);
                  }}
                  readOnly
                  checked={category.id == filter.categoryId}
                />
                <label htmlFor={category.id}>{category.name}</label>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="filter__group">
        <h3 className="filter__group__name">Đánh giá</h3>
        <ul className="filter__group__list">
          <li
            className={
              filter.rating === 5
                ? "filter__group__item filter__group__item--rating active"
                : "filter__group__item filter__group__item--rating"
            }
            onClick={() => handleOnRating(5)}
          >
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </li>
          <li
            className={
              filter.rating === 4
                ? "filter__group__item filter__group__item--rating active"
                : "filter__group__item filter__group__item--rating "
            }
            onClick={() => handleOnRating(4)}
          >
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </li>
          <li
            className={
              filter.rating === 3
                ? "filter__group__item filter__group__item--rating active"
                : "filter__group__item filter__group__item--rating"
            }
            onClick={() => handleOnRating(3)}
          >
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </li>
          <li
            className={
              filter.rating === 2
                ? "filter__group__item filter__group__item--rating active"
                : "filter__group__item filter__group__item--rating"
            }
            onClick={() => handleOnRating(2)}
          >
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </li>
          <li
            className={
              filter.rating === 1
                ? "filter__group__item filter__group__item--rating active"
                : "filter__group__item filter__group__item--rating"
            }
            onClick={() => handleOnRating(1)}
          >
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Filter;
