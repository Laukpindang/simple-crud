import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;

  const [detail, setdetail] = useState({
    task: '',
    deadline: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/data/${id}`, {
        task: detail.task,
        deadline: detail.deadline,
        description: detail.description,
      })
      .then(() => {
        alert('success edit data');
        navigate('/');
      })
      .catch(() => {
        alert('failed add data');
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/data/${id}`)
      .then((res) => {
        setdetail(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert('failed get data');
      });
  }, [id]);

  if (loading) {
    return <span>loading...</span>;
  }

  return (
    <div className='px-2 py-3 mx-auto w-[300px]'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl mb-3'>Edit</h1>
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
              value={detail.task}
              onChange={(e) => setdetail({ ...detail, task: e.target.value })}
              required
              className='rounded border border-black p-1'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='date'>deadline</label>
            <input
              type='date'
              name='date'
              value={detail.deadline}
              onChange={(e) =>
                setdetail({ ...detail, deadline: e.target.value })
              }
              required
              className='rounded border border-black p-1'
            />
          </div>
          <div className='flex flex-col row-span-2'>
            <label htmlFor='description'>description</label>
            <textarea
              value={detail.description}
              onChange={(e) =>
                setdetail({ ...detail, description: e.target.value })
              }
              required
              name='description'
              className='rounded border border-black p-1 resize-none h-full'
            />
          </div>
          <button className='bg-primary text-white rounded p-2' type='submit'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
