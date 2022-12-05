import React from 'react';
import GeneralModal from './GeneralModal';
import data from '../../data/faq.json';

const Component = {
  title: 'General Modal',
  component: GeneralModal,
};

const Template = () => (
  <>
    <button type="button" className="btn btn-primary m-4" data-bs-toggle="modal" data-bs-target='#exampleModal'>
      Launch demo modal
    </button >

    <GeneralModal id='exampleModal'>
      <h3>FAQ</h3>

      {
        data.map((text, i) => (
          <div key={i} className="mt-2">
            <h5>{text.question}</h5>
            <p>{text.answer}</p>
          </div>
        ))
      }
    </GeneralModal>
  </>
);

export const Default = Template.bind({});
export default Component;
