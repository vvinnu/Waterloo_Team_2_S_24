import React from "react";
import loadjs from 'loadjs';

class Script extends React.Component{
    render()
    {
        loadjs.reset();
        loadjs ('%PUBLIC_URL%/../../Gp/assets/vendor/swiper/swiper-bundle.min.js',{async:true});
        loadjs ('%PUBLIC_URL%/../../Gp/assets/vendor/php-email-form/validate.js',{async:true});
        // loadjs ('%PUBLIC_URL%/../../Gp/assets/vendor/purecounter/purecounter.js',{async:true});
        loadjs ('%PUBLIC_URL%/../../Gp/assets/vendor/aos/aos.js',{async:true});
        loadjs ('%PUBLIC_URL%/../../Gp/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',{async:true});
        loadjs ('%PUBLIC_URL%/../../Gp/assets/vendor/glightbox/js/glightbox.min.js',{async:true});
        loadjs ('%PUBLIC_URL%/../../Gp/assets/vendor/isotope-layout/isotope.pkgd.min.js',{async:true});
        loadjs ('%PUBLIC_URL%/../../Gp/assets/js/main.js',{async:true});
        return " ";
    }
}

export default Script