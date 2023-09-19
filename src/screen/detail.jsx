import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { newLineText } from '../helper/newLine';

const Detail = () => {
  const params = useParams();
  const navigate = useNavigate();

  const id = params.id;
  const [detail, setdetail] = useState({
    task: '',
    deadline: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

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
        <h1 className='text-2xl mb-3'>Detail</h1>
        <button
          onClick={() => navigate('/')}
          className='bg-primary text-white rounded p-2'
        >
          Back
        </button>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='grid grid-cols-12'>
          <div className='col-span-4'>Name</div>
          <div className='col-span-2'>:</div>
          <div className='col-span-6'>{detail.task}</div>
        </div>
        <div className='grid grid-cols-12'>
          <div className='col-span-4'>Deadline</div>
          <div className='col-span-2'>:</div>
          <div className='col-span-6'>{detail.deadline}</div>
        </div>
        <div className='grid grid-cols-12'>
          <div className='col-span-4'>Description</div>
          <div className='col-span-2'>:</div>
          <div className='col-span-6'>{newLineText(detail.description)}</div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
