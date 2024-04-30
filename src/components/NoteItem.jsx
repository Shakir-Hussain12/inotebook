import React from 'react';
import PropTypes from 'prop-types';

const NoteItem = ({ data: { tag, title, description } }) => (
  <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
    <div className="flex items-start sm:gap-8">
      <div
        className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
        aria-hidden="true"
      >
        <div className="flex items-center gap-1">
          <span className="h-8 w-0.5 rounded-full bg-indigo-500" />
          <span className="h-6 w-0.5 rounded-full bg-indigo-500" />
          <span className="h-4 w-0.5 rounded-full bg-indigo-500" />
          <span className="h-6 w-0.5 rounded-full bg-indigo-500" />
          <span className="h-8 w-0.5 rounded-full bg-indigo-500" />
        </div>
      </div>

      <div>
        <strong
          className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
        >
          {tag}
        </strong>

        <h3 className="mt-4 text-lg font-medium sm:text-xl">
          <a href="/" className="hover:underline">
            {' '}
            {title}
            {' '}
          </a>
        </h3>

        <p className="mt-1 text-sm text-gray-700">
          {description}
        </p>
      </div>
    </div>
  </article>
);

NoteItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  }).isRequired,
};

export default NoteItem;
