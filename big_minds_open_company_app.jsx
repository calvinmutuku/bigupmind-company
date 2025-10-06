import React, { useState } from "react";

// BigMinds Open Company - Single-file React landing + demo dashboard
// Uses Tailwind CSS classes for styling (assumes Tailwind is installed in the host project)
// Default export a React component so this can be previewed directly.

export default function BigMindsApp() {
  const [user, setUser] = useState(null); // {name,email,role}
  const [activeTab, setActiveTab] = useState("home");
  const [products, setProducts] = useState([
    { id: 1, title: "Phone Case Promo", price: 1200, views: 0 },
    { id: 2, title: "Budget Earbuds", price: 800, views: 0 },
  ]);
  const [form, setForm] = useState({ title: "", price: "" });

  function handleLoginAsAdmin() {
    setUser({ name: "Calvin Mutuku", email: "calvinmutuku350@gmail.com", role: "admin" });
    setActiveTab("dashboard");
  }

  function handleLoginAsUser() {
    setUser({ name: "Jane Student", email: "jane@example.com", role: "user", activated: false });
    setActiveTab("discover");
  }

  function addProduct(e) {
    e.preventDefault();
    const next = { id: Date.now(), title: form.title || "Untitled", price: Number(form.price || 0), views: 0 };
    setProducts([next, ...products]);
    setForm({ title: "", price: "" });
  }

  function approveUser() {
    setUser({ ...user, activated: true });
  }

  function simulateShare(productId) {
    setProducts(products.map(p => p.id === productId ? { ...p, views: p.views + 1 } : p));
    // In a real app we'd record proof/screenshot and credit user
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-blue-50 text-slate-800">
      <header className="border-b bg-white/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-500 to-purple-600 flex items-center justify-center text-white font-bold">BM</div>
            <div>
              <h1 className="font-bold text-lg">BigMinds Open Company</h1>
              <p className="text-xs text-slate-500">Paying youth to promote on WhatsApp statuses</p>
            </div>
          </div>

          <nav className="flex items-center gap-3">
            <NavButton onClick={() => setActiveTab("home")}>Home</NavButton>
            <NavButton onClick={() => setActiveTab("about")}>About</NavButton>
            <NavButton onClick={() => setActiveTab("discover")}>Products</NavButton>
            <NavButton onClick={() => setActiveTab("contact")}>Contact</NavButton>

            {!user ? (
              <div className="flex gap-2">
                <button onClick={handleLoginAsUser} className="px-3 py-2 rounded bg-purple-600 text-white text-sm">Demo User</button>
                <button onClick={handleLoginAsAdmin} className="px-3 py-2 rounded border border-purple-600 text-purple-600 text-sm">Admin</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm">Hi, {user.name}</span>
                <button onClick={() => setUser(null)} className="text-xs px-2 py-1 border rounded">Logout</button>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        {activeTab === "home" && <Hero />}
        {activeTab === "about" && <About />}
        {activeTab === "discover" && (
          <ProductsView
            products={products}
            user={user}
            onSimulateShare={simulateShare}
            onActivate={() => setActiveTab("activate")}
          />
        )}

        {activeTab === "dashboard" && (
          <AdminDashboard
            products={products}
            onAddProduct={addProduct}
            form={form}
            setForm={setForm}
            onApproveUser={approveUser}
          />
        )}

        {activeTab === "activate" && (
          <div className="mt-8 bg-white rounded-xl p-6 shadow">
            <h2 className="font-semibold text-xl">Activation</h2>
            <p className="text-sm text-slate-600 mt-2">To earn, you must pay an activation fee depending on the tier you choose.</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <TierCard title="Junior" fee="KSh 500" payPerView="KSh 30" />
              <TierCard title="Big Up" fee="KSh 1,000" payPerView="KSh 40" />
              <TierCard title="Mega" fee="KSh 1,500" payPerView="KSh 50" />
            </div>
            <div className="mt-4">
              {!user?.activated ? (
                <button onClick={() => setUser({ ...user, activated: true })} className="px-4 py-2 rounded bg-green-600 text-white">Simulate Payment & Activate</button>
              ) : (
                <span className="text-sm text-green-700">Account already activated — you can now earn!</span>
              )}
            </div>
          </div>
        )}

        {activeTab === "contact" && <ContactForm />}
      </main>

      <footer className="border-t py-6 mt-12 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 text-sm text-slate-600 flex justify-between">
          <div>© {new Date().getFullYear()} BigMinds Open Company</div>
          <div>Contact: bigminds@gmail.com • M-PESA Paybill: 247247</div>
        </div>
      </footer>
    </div>
  );
}

function NavButton({ children, onClick }) {
  return (
    <button onClick={onClick} className="text-sm px-3 py-2 rounded hover:bg-slate-100">{children}</button>
  );
}

function Hero() {
  return (
    <section className="rounded-xl bg-white p-8 shadow flex items-center gap-8">
      <div className="flex-1">
        <h2 className="text-3xl font-extrabold">Turn WhatsApp status views into income</h2>
        <p className="mt-3 text-slate-600">We empower university & college students and unemployed youth by paying them to promote products on their WhatsApp statuses. Simple activation. Transparent payments.</p>
        <div className="mt-5 flex gap-3">
          <button onClick={() => window.alert('Use demo user or admin buttons in header to explore')} className="px-5 py-3 rounded bg-purple-600 text-white">Try Demo</button>
          <button onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })} className="px-5 py-3 rounded border">Learn More</button>
        </div>
      </div>

      <div className="w-96">
        <div className="rounded-xl border p-4 bg-gradient-to-b from-white to-green-50">
          <h3 className="font-semibold">How it works (quick)</h3>
          <ol className="mt-3 space-y-2 text-sm text-slate-600">
            <li>1. Sign up and activate a tier.</li>
            <li>2. Admin posts promos and tasks.</li>
            <li>3. Share on WhatsApp status and upload proof.</li>
            <li>4. Get paid per view after approval.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="rounded-xl bg-white p-6 shadow">
      <h2 className="text-2xl font-semibold">About BigMinds Open Company</h2>
      <p className="mt-3 text-slate-600">Based in South Africa and partnering with Kenyan institutions, BigMinds wants to reduce youth unemployment by creating micro-earning opportunities. We connect clients who need low-cost grassroots promotion with a vetted network of student promoters.</p>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <Stat title="Partners" value="Govt & NGOs" />
        <Stat title="Target" value="Students & Youth" />
        <Stat title="Payments" value="M-PESA & Bank" />
      </div>
    </section>
  );
}

function Stat({ title, value }) {
  return (
    <div className="p-4 rounded border">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="font-bold mt-1">{value}</div>
    </div>
  );
}

function ProductsView({ products, user, onSimulateShare }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((p) => (
        <div key={p.id} className="bg-white rounded-xl p-4 border">
          <h3 className="font-semibold">{p.title}</h3>
          <p className="text-sm text-slate-500 mt-1">Price: KSh {p.price}</p>
          <p className="text-xs text-slate-400 mt-2">Shares: {p.views}</p>

          <div className="mt-4 flex gap-2">
            <button onClick={() => onSimulateShare(p.id)} className="px-3 py-2 rounded bg-green-600 text-white text-sm">Simulate Share</button>
            <button onClick={() => window.alert('Upload screenshot modal (not implemented)')} className="px-3 py-2 rounded border text-sm">Upload Proof</button>
          </div>
        </div>
      ))}

      <div className="col-span-3 mt-2 text-sm text-slate-500">Tip: Use the demo admin in the header to add more products and test flows.</div>
    </div>
  );
}

function AdminDashboard({ products, onAddProduct, form, setForm, onApproveUser }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 bg-white p-4 rounded-xl border">
        <h3 className="font-semibold">Products</h3>
        <div className="mt-4 space-y-3">
          {products.map(p => (
            <div key={p.id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-slate-500">KSh {p.price} • Shares: {p.views}</div>
              </div>
              <div className="flex gap-2">
                <button className="px-2 py-1 text-xs border rounded">Edit</button>
                <button className="px-2 py-1 text-xs bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border">
        <h3 className="font-semibold">Add Product</h3>
        <form onSubmit={onAddProduct} className="mt-3 space-y-3">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Product title" className="w-full p-2 border rounded" />
          <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price (KSh)" className="w-full p-2 border rounded" />
          <div className="flex gap-2">
            <button type="submit" className="px-3 py-2 bg-purple-600 text-white rounded">Add</button>
            <button type="button" onClick={onApproveUser} className="px-3 py-2 border rounded">Approve Demo User</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ContactForm() {
  const [state, setState] = useState({ name: "", email: "", message: "" });
  function submit(e) {
    e.preventDefault();
    window.alert('Thanks! Message saved to demo inbox (not implemented).');
    setState({ name: "", email: "", message: "" });
  }
  return (
    <div className="bg-white p-6 rounded-xl border max-w-2xl">
      <h2 className="font-semibold">Contact Us</h2>
      <form onSubmit={submit} className="mt-3 space-y-3">
        <input value={state.name} onChange={(e)=>setState({...state,name:e.target.value})} placeholder="Your name" className="w-full p-2 border rounded" />
        <input value={state.email} onChange={(e)=>setState({...state,email:e.target.value})} placeholder="Email" className="w-full p-2 border rounded" />
        <textarea value={state.message} onChange={(e)=>setState({...state,message:e.target.value})} placeholder="Message" className="w-full p-2 border rounded" rows={5} />
        <button className="px-4 py-2 rounded bg-green-600 text-white">Send</button>
      </form>
    </div>
  );
}

function TierCard({ title, fee, payPerView }) {
  return (
    <div className="p-4 border rounded">
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-slate-600">Activation: {fee}</div>
      <div className="text-sm text-slate-600 mt-2">Pay/View: {payPerView}</div>
    </div>
  );
}
