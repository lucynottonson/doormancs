import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5' 
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <AuthForm />
      </div>
    </main>
  );
}