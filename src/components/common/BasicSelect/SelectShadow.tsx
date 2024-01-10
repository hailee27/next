import React from 'react';
import CButtonShadow from '../CButtonShadow';
// import BasicSelect from '.';

function SelectShadow() {
  // const [dropDown, setDropDown] = useState();
  return (
    <div className="w-full h-[50px] relative">
      <div className="absolute z-10 w-full h-full">
        <CButtonShadow
          classBgColor="bg-white"
          classShadowColor="bg-main-text"
          // onClick={() => setDropDown(!dropDown)}
          textClass="!justify-between px-[40px]"
          title="alooo"
          withIcon={{
            position: 'right',
            icon: (
              <svg fill="none" height="15" viewBox="0 0 14 15" width="14" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.1494 6.72266L12.751 7.32422C12.9971 7.59766 12.9971 8.00781 12.751 8.25391L7.44629 13.5586C7.17285 13.832 6.7627 13.832 6.5166 13.5586L1.18457 8.25391C0.938477 8.00781 0.938477 7.57031 1.18457 7.32422L1.78613 6.72266C2.05957 6.44922 2.46973 6.47656 2.74316 6.72266L5.8877 10.0312V2.15625C5.8877 1.80078 6.16113 1.5 6.54395 1.5H7.41895C7.77441 1.5 8.0752 1.80078 8.0752 2.15625V10.0312L11.1924 6.72266C11.4658 6.47656 11.876 6.44922 12.1494 6.72266Z"
                  fill="#333333"
                />
              </svg>
            ),
          }}
        />
      </div>
      <div className="absolute w-full  top-0 z-0 ">{/* <BasicSelect open={dropDown} /> */}</div>
    </div>
  );
}

export default SelectShadow;
