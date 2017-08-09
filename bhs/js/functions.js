var MainTable = {
    init: function () {
        this.responsiveTable();
        this.tooltip();
        this.print();
    },
    responsiveTable: function () {
        $('.table-responsive').responsiveTable({});
    },
    tooltip: function () {
        if ($(window).width() >= 1200) {
            $('.tooltip-parent').tooltip({
                placement: "bottom"
            });
        }
        $('.tooltip-parent').click(function() {
            $(this).toggleClass('opened');
        });
    }
    ,
    print: function () {
        $('.print-btn').on('click', function () {
            window.print();
        });
    }
};

$(document).ready(function () {
    MainTable.init();
});
