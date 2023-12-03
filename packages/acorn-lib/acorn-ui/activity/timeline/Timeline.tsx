import { Icon } from "morse-react";
import type { PropsWithChildren, ReactNode } from "react";

type HasClassAndChildrenProps<T = {}> = PropsWithChildren<
  {
    className?: string;
  } & T
>;

type TimelineProps = HasClassAndChildrenProps<{
  /**
   * True to indicate your timeline will use icons against each entry.
   * This ensures the necessary space is reserved.
   */
  icons?: boolean;
}>;

/**
 * A timeline is a collection of timeline items showing a connected history of a particular
 * record.
 * @param props
 * @returns
 */
export const Timeline = (props: TimelineProps) => {
  const classes = ["ac-timeline"];

  if (props.className) {
    classes.push(props.className);
  }

  if (props.icons) {
    classes.push("+icons");
  }

  return (
    <div className={classes.join(" ")}>
      <ol role="list">
        {props.children}
      </ol>
    </div>
  );
};

type TimelineItemProps = HasClassAndChildrenProps<{
  /**
   * Simply pass the name of an icon sprite to position an icon as the first child
   * of the timeline item.
   *
   * If you are using icons but in some cases don't have an appropriate one (or for
   * more minor events) you can supply the reserved value of "blank" instead.
   *
   * Alternatively you can simply include a manual <Icon /> component or any
   * custom react content, however you should ensure it has a single parent elements,
   * appears before the content component and has the ac-timeline__item-icon class
   */
  icon?: string | "blank";
}>;

export const TimelineItem = (props: TimelineItemProps) => {
  const classes = ["ac-timeline__item", "ac-timeline-item"];

  if (props.className) {
    classes.push(props.className);
  }

  return (
    <li className={classes.join(" ")}>
      {props.icon && props.icon === "blank" && (
        <span className="ac-timeline-item__icon +blank"></span>
      )}
      {props.icon && props.icon !== "blank" && (
        <span className="ac-timeline-item__icon">
          <Icon iconName={props.icon} />
        </span>
      )}
      {props.children}
    </li>
  );
};

type TimelineItemContentProps = HasClassAndChildrenProps;

/**
 * The content of timeline items should be wrapped in this component to ensure it
 * positions correctly beside the icon.
 */
export const TimelineItemContent = (props: TimelineItemContentProps) => {
  const classes = ["ac-timeline-item__content"];

  if (props.className) {
    classes.push(props.className);
  }

  return <span className={classes.join(" ")}>{props.children}</span>;
};

interface TimelineItemContentEventProps {
  className?: string;
  children?: ReactNode;
}

export const TimelineItemContentEvent = (props: TimelineItemContentEventProps) => {
  const classes = ["ac-timeline-item__event"];

  if (props.className) {
    classes.push(props.className);
  }

  return <span className={classes.join(" ")}>{props.children}</span>;
};

export const TimelineItemContentNote = (props: TimelineItemContentEventProps) => {
  const classes = ["+note"];

  if (props.className) {
    classes.push(props.className);
  }

  return <TimelineItemContentEvent {...props} className={classes.join(" ")} />;
};

interface TimelineItemContentCreditProps {
  className?: string;
  /**
   * If there is an author, the author's name
   */
  author?: string;
  /**
   * If the author is an agent that has an external link you can provide
   * a URL to link to.
   */
  authorUrl?: string;
  /**
   * If the author is an internal user and you have a users page you should
   * provide the relative path. This will use a `Link` from react-router-dom
   */
  authorLinkTo?: string;
  /**
   * The date string of the event. As it's a simple string, you can provide dates
   * in any format, but try to be consistent with other date formates in your project.
   */
  date?: string;
}

export const TimelineItemContentCredit = (props: TimelineItemContentCreditProps) => {
  const classes = ["ac-timeline-item__credit ac-timeline-credit"];

  if (props.className) {
    classes.push(props.className);
  }

  let author = null;

  if (props.author) {
    if (props.authorLinkTo) {
      author = (
        <a href={props.authorLinkTo} className="ac-timeline-credit__author">
          {props.author}
        </a>
      );
    } else if (props.authorUrl) {
      author = (
        <a href={props.authorUrl} className="ac-timeline-credit__author">
          {props.author}
        </a>
      );
    } else {
      author = <span className="ac-timeline-credit__author">{props.author}</span>;
    }
  }

  return (
    <span className={classes.join(" ")}>
      {author}
      <time className="ac-timeline-credit__time">{props.date}</time>
    </span>
  );
};

Timeline.Item = TimelineItem;
Timeline.ItemContent = TimelineItemContent;
Timeline.ItemContentEvent = TimelineItemContentEvent;
Timeline.ItemContentNote = TimelineItemContentNote;
Timeline.ItemContentCredit = TimelineItemContentCredit;
