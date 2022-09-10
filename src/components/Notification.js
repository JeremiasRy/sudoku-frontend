export function Notification({notification}) {
    if (!notification) {
        return;
    }

    return (
        <div className="notification">
            {notification}
        </div>
    )
}