import React, { memo } from "react";

const IncomeComponent = (props) => {
    const { incomeTypes, incomeSources } = props;
    return (
        <>
            {incomeTypes.length === 0 || incomeSources.length === 0 ?
                (
                    <h4 className={"text-center"}>
                        You have not configured any Income Type and Income Source yet,
                        Please configure them in the Config tab.
                    </h4>
                )
                :
                (<AddIncomeForm />)
            }
        </>
    )
};

const AddIncomeForm = (props) => {
    return (
        <h1>All good, form will come up here where user can add income.</h1>
    )
};

export default memo(IncomeComponent);