import React, { useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Buttons from './Buttons';
import noteContext from '../context/notes/noteContext';

const NoteItem = ({
  data: {
    _id, tag, title, description,
  },
}) => {
  const inputRef = useRef(null);
  const context = useContext(noteContext);
  const { isEditable } = context;
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteDescription, setNoteDescription] = useState(description);
  const [noteTag, setNoteTag] = useState(tag);

  return (
    <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
      <div className="flex items-start justify-between flex-wrap">
        <div className="flex sm:gap-8">
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
            <select
              className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white text-wrap"
              disabled={!isEditable}
              onChange={(e) => setNoteTag(e.target.value)}
              defaultValue={tag}
            >
              <option value="General">General</option>
              <option value="Specific">Specific</option>
            </select>

            <h3 className="mt-4 text-lg font-medium sm:text-xl text-wrap">
              <input
                type="text"
                className="bg-white"
                defaultValue={noteTitle}
                disabled={!isEditable}
                onChange={(e) => setNoteTitle(e.target.value)}
                ref={inputRef}
              />
            </h3>

            <textarea
              className="text-sm text-gray-700 resize-none min-w-full min-h-36 mt-3 bg-white text-wrap"
              disabled={!isEditable}
              onChange={(e) => setNoteDescription(e.target.value)}
              defaultValue={noteDescription}
            />
          </div>
        </div>
        <Buttons
          data={{
            tag: noteTag, title: noteTitle, description: noteDescription, _id,
          }}
          inputRef={inputRef}
        />
      </div>
    </article>
  );
};

NoteItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default NoteItem;
