import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const userInfo = localStorage.getItem('userInfo');

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    if (!userInfo) return null;

    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="text-xl font-bold">Household Manager</Link>
                <div className="space-x-4">
                    <Link to="/recipes" className="hover:text-blue-200">Recipes</Link>
                    <Link to="/schedule" className="hover:text-blue-200">Schedule</Link>
                    <Link to="/shopping-list" className="hover:text-blue-200">Shopping List</Link>
                    <button onClick={handleLogout} className="hover:text-blue-200">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
