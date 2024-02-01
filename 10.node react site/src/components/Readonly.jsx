import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const Readonly = ({val , uplist, delelist}) => {
    return (
        <>
            <tbody>
                <tr>
                    <td>{val.firstName}</td>
                    <td>{val.lastName}</td>
                    <td>{val.email}</td>
                    <td>{val.phonenumber}</td>
                    <td>{val.password}</td>
                    <td>
                    <button className='btn btn-primary' onClick={() => uplist(val, val.id)}><EditIcon />
                    </button>
                    <button className='btn btn-danger ml-2' onClick={() => delelist(val.id)}    ><DeleteForeverIcon /></button>
                    </td>
                </tr>
            </tbody>
        </>
    )
}

export default Readonly