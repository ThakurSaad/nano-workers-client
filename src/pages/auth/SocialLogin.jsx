const SocialLogin = ({ icon, text }) => {
  return (
    <section>
      <button className="btn bg-white border-black  w-full max-w-xs uppercase mb-4">
        <span className="text-2xl">{icon}</span>
        {text}
      </button>
    </section>
  );
};

export default SocialLogin;
