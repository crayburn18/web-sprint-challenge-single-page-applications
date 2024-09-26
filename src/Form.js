import React from 'react';

export default function Form(props){
    const { values, change, submit, disabled, errors } = props;

    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
      };
    
      const onChange = (evt) => {
        const { name, value, checked, type } = evt.target;
        const valueToUse = type === "checkbox" ? checked : value;
        change(name, valueToUse);
      };

    return(
        <form id='pizza-form' onSubmit={onSubmit}>
            <div>
                <div className="errors">
                    <div>{errors.name}</div>
                    <div>{errors.size}</div>
                </div>
                <div>
                    <label>
                        Name:
                        <input
                            id='name-input' 
                            value={values.name}
                            onChange={onChange}
                            name='name'
                            type='text'
                        />
                    </label>                    
                </div>
                <h2>Build Your Pizza</h2>
                <div>
                    <h3>Choose your size</h3>
                    <label>
                        <select id='size-dropdown' onChange={onChange} value={values.size} name='size'>
                            <option value=''>-Select a Size</option>
                            <option value='small'>-small</option>
                            <option value='medium'>-medium</option>
                            <option value='large'>-large</option>
                        </select>
                    </label>                    
                </div>
                <div>
                    <h3>Select you toppings</h3>
                    <label>
                        Pepperoni
                        <input 
                            type='checkbox'
                            name='pepperoni'
                            checked={values.pepperoni}
                            onChange={onChange}
                        />
                    </label>
                    <label>
                        Sausage
                        <input 
                            type='checkbox'
                            name='sausage'
                            checked={values.sausage}
                            onChange={onChange}
                        />
                    </label> 
                    <label>
                        Olives
                        <input 
                            type='checkbox'
                            name='olives'
                            checked={values.olives}
                            onChange={onChange}
                        />
                    </label> 
                    <label>
                        Pineapple
                        <input 
                            type='checkbox'
                            name='pineapple'
                            checked={values.pineapple}
                            onChange={onChange}
                        />
                    </label>                     
                </div>
                <div>
                    <h3>Special Instructions</h3>
                    <label>
                        <input 
                            id='special-text'
                            type='text'
                            name='special'
                            value={values.special}
                            onChange={onChange}
                        />
                    </label>                    
                </div>
                <button id='order-button' disabled={disabled}>Order</button>
            </div>
        </form>
    )
};