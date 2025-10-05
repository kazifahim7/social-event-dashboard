

const Navbar = () => {
     return (
          <nav className="flex items-center justify-between px-6 py-3 shadow  bg-white">
               {/* Left: Logo or title */}
               <h1 className="text-xl font-bold text-black">Momentum</h1>

               {/* Right: Profile Image */}
               <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-400">
                    <img
                         src="https://i.postimg.cc/cHFk4YZD/Frame-83.png" 
                         alt="User"
                         className="w-full h-full object-cover"
                    />
               </div>
          </nav>
     );
};

export default Navbar;
