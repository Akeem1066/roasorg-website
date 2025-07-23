export default function CreateCheckoutSession() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center'
    }}>
      <div>
        <h1>API Endpoint</h1>
        <p>This endpoint is for mobile app API calls only.</p>
        <p>Please use: <code>/api/create-checkout-session</code></p>
      </div>
    </div>
  );
}

// This will be statically exported
export async function getStaticProps() {
  return {
    props: {},
  };
} 