import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { uid } from 'uid';

const Add = () => {
  const navigate = useNavigate();

  const [task, setTask] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/data', {
        id: uid(),
        task,
        deadline,
        description,
      })
      .then(() => {
        alert('success add data');
        navigate('/');
      })
      .catch(() => {
        alert('failed add data');
      });
  };

  return (
    <div className='px-2 py-3 mx-auto w-[300px]'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl'>Add</h1>
        <button
          onClick={() => navigate('/')}
          className='bg-primary text-white rounded p-2'
        >
          Cancel
        </button>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='grid grid-rows-5 gap-3'>
          <div className='flex flex-col'>
            <label htmlFor='task'>task name</label>
            <input
              type='text'
              name='task'
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
              className='rounded border border-black p-1'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='date'>deadline</label>
            <input
              type='date'
              name='date'
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              className='rounded border border-black p-1'
            />
          </div>
          <div className='flex flex-col row-span-2'>
            <label htmlFor='description'>description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              name='description'
              className='rounded border border-black p-1 resize-none h-full'
            />
          </div>
          <button className='bg-primary text-white rounded' type='submit'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
