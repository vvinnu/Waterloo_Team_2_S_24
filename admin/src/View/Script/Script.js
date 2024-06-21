import React from "react";
import loadjs from 'loadjs';

class Script extends React.Component {
    render() {
        loadjs.reset();
        loadjs('%PUBLIC_URL%/../../Admin/assets/vendors/chart.js/Chart.min.js', { async: true });
        loadjs('%PUBLIC_URL%/../../Admin/assets/js/file-upload.js', { async: true });
        loadjs('%PUBLIC_URL%/../../Admin/assets/js/typeahead.js', { async: true });
        loadjs('%PUBLIC_URL%/../../Admin/assets/js/select2.js', { async: true });
        loadjs('%PUBLIC_URL%/../../Admin/assets/vendors/progressbar.js/progressbar.min.js', { async: true });
        loadjs('%PUBLIC_URL%/../../Admin/assets/vendors/jvectormap/jquery-jvectormap.min.js', { async: true });
        loadjs('%PUBLIC_URL%/../../Admin/assets/vendors/jvectormap/jquery-jvectormap-world-mill-en.js', { async: true });
        loadjs('%PUBLIC_URL%/../../Admin/assets/vendors/owl-carousel-2/owl.carousel.min.js', { async: true });
        loadjs('%PUBLIC_URL%/../../Admin/assets/js/off-canvas.js', { async: true });
        loadjs('%PUBLIC_URL%/../../Admin/assets/js/hoverable-collapse.js', { async: true });
        loadjs('%PUBLIC_URL%/../../Admin/assets/js/misc.js', { async: true });
        loadjs('%PUBLIC_URL%/../../Admin/assets/js/settings.js', { async: true });
        loadjs('%PUBLIC_URL%/../../Admin/assets/js/todolist.js', { async: true });
        loadjs('%PUBLIC_URL%/../../Admin/assets/js/dashboard.js', { async: true });

        return " ";
    }
}

export default Script;