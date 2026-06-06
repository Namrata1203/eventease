namespace eventease.Models;

public class Attendee
{
    public string Id { get; set; } = "";
    public string EventId { get; set; } = "";
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public string TicketType { get; set; } = "General";
    public string RegisteredAt { get; set; } = "";
    public bool CheckedIn { get; set; }
    public string? CheckedInAt { get; set; }
    public string? Notes { get; set; }
}
