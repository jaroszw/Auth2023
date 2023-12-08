export default function About() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqBody = { name: 'jarosz', email: 'wjarosz@erzeszow.pl' };
    const token = ' 23y42p43jrtb4q;wleg';

    try {
      const res = await fetch('http://localhost:3000/api/auth/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${'Bearer' + token}`,
        },
        body: JSON.stringify(reqBody),
        credentials: 'include',
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3  max-w-lg mx-auto">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

        <button
          onClick={handleSubmit}
          type="submit"
          className="  text-white p-3 w-200 h-50 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 bg-slate-700"
        >
          {' '}
          TEST CLICK
        </button>
      </div>
    </div>
  );
}
