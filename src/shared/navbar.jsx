

const Navbar = () => {
     return (
          <nav className="flex items-center justify-between px-6 py-3 shadow  bg-white">
               {/* Left: Logo or title */}
              <div className="flex items-center gap-3">
                    <img src="https://i.postimg.cc/cJvwfRR7/image-2.png" alt="" className="w-12 h-12" />
                    <h1 className="text-xl font-bold text-black">Momentum</h1>
              </div>

               {/* Right: Profile Image */}
               <div title="admin" className="w-10 hidden h-10 rounded-full overflow-hidden border-2 border-yellow-400">
                    <img
                         src="https://i.postimg.cc/cJvwfRR7/image-2.png" 
                         alt="User"
                         className="w-full hidden h-full object-cover"
                    />
               </div>
          </nav>
     );
};

export default Navbar;
