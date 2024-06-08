function ContactMe() {
  return (
    <>
      <p>
        <span>email:</span>
        <span className="ml-2 inline-block">
            <a
                referrerPolicy="no-referrer"
                target="_blank"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=dogakorkmaz09@gmail.com"
                className="hover:underline hover:text-blue-400 visited:hover:text-blue-500 duration-100"
            > dogakorkmaz09@gmail.com
            </a>
        </span>
      </p>
      <p>
        <span>country:</span>
        <span className="ml-2 inline-block">turkey</span>
      </p>
    </>
  );
}

export default ContactMe;
