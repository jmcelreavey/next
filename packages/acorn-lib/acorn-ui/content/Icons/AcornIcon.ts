const icons = {
  Action: {
    Check: "icon-check",
    CheckCircle: "icon-check_circle",
    X: "icon-x",
    XCircle: "icon-x_circle",
    AddCircle: "icon-add_circle",
    RemoveCircle: "icon-remove_circle",
    Delete: "icon-delete",
    Tune: "icon-tune",
    FilterListAlt: "icon-filter_list_alt",
    Move: "icon-move",
    Tag: "icon-tag",
    Favorite: "icon-favorite",
    FavoriteOutline: "icon-favorite_outline",
    AddTo: "icon-add_to",
    Launch: "icon-launch",
    Edit: "icon-edit",
    Star: "icon-star",
    StarOutline: "icon-star_outline",
    View: "icon-view",
    ViewOff: "icon-view_off",
    Bookmark: "icon-bookmark",
    Label: "icon-label",
    Link: "icon-link",
    Unlink: "icon-Unlink",
    Flag: "icon-flag",
    BookmarkAdd: "icon-bookmark_add",
  },
  Arrow: {
    KeyboardArrowDown: "icon-keyboard_arrow_down",
    ArrowForward: "icon-arrow_forward",
    ArrowBack: "icon-arrow_back",
    ArrowUp: "icon-arrow_up",
    ArrowDown: "icon-arrow_down",
    AnnotationArrowRounded: "icon-arrow_annotation-rounded",
    AnnotationArrowRoundedTwo: "icon-arrow_annotation-rounded-two",
    AnnotationArrowStraight: "icon-arrow_annotation-straight",
    Shortcut: "icon-shortcut",
    SplitArrow: "icon-split_arrow",
    ChevronForward: "icon-chevron_forward",
    DropDown: "icon-arrow_drop_down",
    Sort: "icon-sort",
    Minimise: "icon-minimise",
    Maximise: "icon-maximise",
    Logout: "icon-logout",
    Asterisk: "icon-asterisk",
    Refresh: "icon-refresh",
  },
  Airline: {
    Default: "icon-iata-default",
    FR: "icon-iata-fr",
    BY: "icon-iata-by",
    LS: "icon-iata-ls",
    U2: "icon-iata-u2",
    OA: "icon-iata-oa",
  },
  Business: {
    Work: "icon-work",
    Folder: "icon-folder",
    Business: "icon-business",
    Inventory: "icon-inventory",
    Credit_card: "icon-credit_card",
    Document: "icon-document",
    Attachment: "icon-attachment",
    Clipboard: "icon-clipboard",
    Chart: "icon-chart",
    List: "icon-list",
    Checklist: "icon-checklist",
    Receipt: "icon-receipt",
    Cash: "icon-cash",
  },
  Cloud: {
    CloudUpload: "icon-cloud_upload",
    CloudDownload: "icon-cloud_download",
    Cloud: "icon-cloud",
    CloudDone: "icon-cloud_done",
  },
  Communication: {
    ChatBubble: "icon-chat_bubble",
    Call: "icon-call",
    Calendar: "icon-calendar",
    DateRange: "icon-date_range",
    Share: "icon-share",
    Email: "icon-email",
    Phone: "icon-phone",
    Inbox: "icon-inbox",
    Wifi: "icon-wifi",
    DateTime: "icon-date_time",
    History: "icon-history",
    Timer: "icon-timer",
  },
  Map: {
    LocationPin: "icon-location_pin",
    Globe: "icon-globe",
    PlaneLanding: "icon-plane_landing",
    PlaneTakingOff: "icon-plane_taking_off",
    Locate: "icon-locate",
    Parking: "icon-parking",
    NoParking: "icon-no_parking",
    Sun: "icon-sun",
    Map: "icon-map",
    Automated: "icon-automated",
    AutomationOff: "icon-automation-off",
  },
  Media: {
    QrCode: "icon-qr_code",
    Camera: "icon-camera",
    Photo: "icon-photo",
    Fullscreen: "icon-fullscreen",
    PlayCircle: "icon-play_circle",
    PauseCircle: "icon-pause_circle",
    PlayArrow: "icon-play_arrow",
    ReplayCircle: "icon-replay_circle",
    NoPhoto: "icon-no_photo",
    AddPhoto: "icon-add_photo",
  },
  Navigation: {
    MoreHorizontal: "icon-more-horizontal",
    MoreVertical: "icon-more-vertical",
    Search: "icon-search",
    Menu: "icon-menu",
    MenuPpen: "icon-menu_open",
    Home: "icon-home",
    Settings: "icon-settings",
    ZoomOut: "icon-zoom_out",
    ZoomIn: "icon-zoom_out",
    Grid: "icon-grid",
  },
  Notification: {
    Notifications: "icon-notifications",
    Info: "icon-info",
    Warning: "icon-warning",
    Clock: "icon-clock",
    Help: "icon-help",
    Security: "icon-security",
  },
  Objects: {
    Luggage: "icon-luggage",
    Car: "icon-car",
    Bus: "icon-bus",
    Ticket: "icon-ticket",
    Plane: "icon-plane",
    Cart: "icon-cart",
    Key: "icon-key",
    Sparkle: "icon-sparkle",
    Wrench: "icon-wrench",
    CCTV: "icon-cctv",
    Fence: "icon-security-fence",
    Light: "icon-security-lighting",
    Dashboard: "icon-dashboard",
  },
  People: {
    AddPerson: "icon-add_person",
    People: "icon-people",
    Person: "icon-person",
    PersonCircle: "icon-person_circle",
    PersonCheck: "icon-person_check",
  },
};

/**
 * Common icons used in most systems.
 */
export const AcornIcon = Object.assign(icons, {
  /**
   * A combination of all categories of icon, useful for making simple dropdown selects in
   * Storybook
   */
  All: {
    ...icons.Action,
    ...icons.Arrow,
    ...icons.Business,
    ...icons.Cloud,
    ...icons.Communication,
    ...icons.Map,
    ...icons.Media,
    ...icons.Navigation,
    ...icons.Notification,
    ...icons.Objects,
    ...icons.People,
    ...icons.Airline,
  },
});
