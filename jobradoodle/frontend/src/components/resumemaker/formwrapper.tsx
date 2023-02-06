import { Card, CardHeader, Paper } from "@mui/material";
import React, { Children } from "react";
import { ReactNode } from "react";

type FormWrapperProps = {
    title: string;
    children: ReactNode;
}
export function FormWrapper({ title, children }: FormWrapperProps) {
    const childrenArray = React.Children.toArray(children);
    return (

        <>
            <Card>
                {/* <h2 style={{
                textAlign: 'center',
                margin: 0,
                marginBottom: '2rem'
            }}> */}
                <CardHeader title={title} />

                {/* </h2> */}
                {/* <div style={{
                display: 'grid',
                gap: '1rem .5rem',
                justifyContent: 'flex-start',
                gridTemplateColumns: 'auto minmax(auto 400px)'
            }}> */}
                <div style={{
                    display: 'grid',
                    gap: 5
                }}>

                    {Children.map(childrenArray, (child: ReactNode, index: number) => {
                        const isLast = index === childrenArray.length - 1;
                        return (
                            <Paper key={index} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem',
                                marginBottom: isLast ? 0 : '1rem'
                            }}>
                                {child}
                            </Paper>
                        )
                    })}


                    
                </div>


            </Card></>

    )
}