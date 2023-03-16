import { useDispatch, useSelector } from 'react-redux';
import { updateUsername, updatePassword, validate } from '../reducers/loginReducer';
import { useNavigate } from 'react-router';
import { RootState, AppDispatch } from '../store';
import { useAppDispatch } from '../hooks';

export function LoginCard (){

    const dispatch = useDispatch()
    const AppDispatch = useAppDispatch();
    const state = useSelector((state: RootState) => state.login)
    const navigate = useNavigate();
    

    return (
        <div className='flex w-[50%] h-[50%] flex-col justify-center items-center gap-y-2.5 shadow-2xl rounded-2xl'>
            <div className='flex flex-col justify-center items-center gap-y-2.5 w-full'>
                <label>username :</label>
                <input type={'text'}
                        className='border-2 p-2 rounded-md w-[40%]'
                        onChange={(e)=> dispatch(updateUsername(e.target.value))}
                        />
                <label>password :</label>
                <input type={'password'}
                        className='border-2 p-2 rounded-md w-[40%]'
                        onChange={(e)=> dispatch(updatePassword(e.target.value))}
                        />
                <button 
                    className='bg-blue-800 text-stone-50 w-[20%] justify-self-end p-4 mt-5 rounded'
                    onClick={ async () => {
                        const isLoggedIn =  await AppDispatch(validate());
                        if (isLoggedIn) navigate('user-page')                
                    }}
                    >Submit</button>
            </div>
        </div>
    )
}