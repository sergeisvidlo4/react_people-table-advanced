import { ChangeEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');
  const centuries = ['16', '17', '18', '19', '20'];

  const handleQueryChange = (inputEvent: ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);
    const newQuery = inputEvent.target.value;

    if (newQuery) {
      newParams.set('query', newQuery);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className="is-active" href="#/people">
          All
        </a>

        <a className="" href="#/people?sex=m">
          Male
        </a>

        <a className="" href="#/people?sex=f">
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => {
              const isSelected = selectedCenturies.includes(century);

              const filteredCenturies = selectedCenturies.filter(
                selectedCentury => selectedCentury !== century,
              );

              const nextCenturies = isSelected
                ? filteredCenturies
                : [...selectedCenturies, century];

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={`button mr-1 ${isSelected ? 'is-info' : ''}`}
                  params={{
                    centuries: nextCenturies.length > 0 ? nextCenturies : null,
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
