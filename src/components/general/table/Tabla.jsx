import React from 'react'
import { Table } from 'antd'
const TableComp = ({columns, data, expansible, titleExpansible, pagination, deleteR, rowSelection, tamaño}) =>{

    return(
        <div className="box">
            <Table
                rowSelection={rowSelection?{
                    
                    type: "checkbox",
                    ...rowSelection,
                    
                }:null}
                columns={columns}
                delete ={deleteR}
                size={tamaño}

                dataSource={data}
                rowKey={'id'}
                pagination={pagination}
            />
        </div>  
    )
}
export default TableComp