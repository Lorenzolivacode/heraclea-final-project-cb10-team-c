import React from "react";

function WhereWeAre() {
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2868.5083000060963!2d13.279766953618033!3d37.39444700932113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x131a65f668cbce15%3A0xe7d9d20c942aadaa!2sParking!5e1!3m2!1sen!2sit!4v1726136788441!5m2!1sen!2sit"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default WhereWeAre;
