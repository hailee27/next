export default function index() {
  //   useEffect(() => {
  //     const handleStorageChange = (event) => {
  //       if (event.key === 'myData') {
  //         const code = localStorage.getItem('myData');
  //         // Data has changed in another tab
  //         const data = event.newValue;
  //         console.log(data, code);
  //         localStorage.removeItem('myData');
  //       }
  //     };

  //     window.addEventListener('storage', handleStorageChange);

  //     return () => {
  //       window.removeEventListener('storage', handleStorageChange);
  //     };
  //   }, []);
  return (
    <div
    //   onClick={() => {
    //     // window.addEventListener('storage', onChangeLocalStorage, false);
    //     const width = 450;
    //     const height = 730;
    //     const left = window.screen.width / 2 - width / 2;
    //     const top = window.screen.height / 2 - height / 2;
    //     // window.open(
    //     //   'https://f785-2405-4802-248e-48e0-5043-5e61-58ab-2ec2.ngrok-free.app/demo-auth/demo1',
    //     //   'twitter',
    //     //   `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=${width}, height=${height}, top=${top}, left=${left}`
    //     // );
    //     window.open(
    //       'http://localhost:3000/demo-auth/demo1',
    //       'twitter',
    //       `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=${width}, height=${height}, top=${top}, left=${left}`
    //     );
    //   }}
    >
      click to view Page 1
    </div>
  );
}
