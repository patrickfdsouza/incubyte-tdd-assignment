import React, { useRef, useState } from 'react';
import { add } from '~/utils/add';

const AddNumbers = () => {
  const textRef = useRef<String>('');
  const [result, setResult] = useState<String | null>(null);
  const [error, setError] = useState<String | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    textRef.current = e.target.value;
  };

  const onSubmit = () => {
    try {
      setError(null);
      setResult(null);
      // console.log(textRef.current);
      const result = add(String(textRef.current));
      // console.log('result', result);
      setResult(JSON.stringify(result, null, 2));
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <>
      <textarea
        placeholder='Enter your input here...'
        className='w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200'
        rows={4}
        onChange={onChange}
      ></textarea>
      <button
        className='w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
        onClick={onSubmit}
      >
        Submit
      </button>
      {result && (
        <label className='text-sm text-gray-500 dark:text-gray-400'>
          Result:
          <br />
          <span className='text-gray-700 dark:text-gray-200'>{result}</span>
        </label>
      )}
      {error && (
        <>
          <br />
          <label className='text-sm text-red-500 dark:text-red-400'>
            Error:
            <br />
            <span className='text-red-700 dark:text-red-200'>{error}</span>
          </label>
        </>
      )}
    </>
  );
};

export default AddNumbers;
