namespace eventease.Models;

public class Event
{
    public string Id { get; set; } = "";
    public string Title { get; set; } = "";
    public string Date { get; set; } = "";
    public string Time { get; set; } = "";
    public string Location { get; set; } = "";
    public string Description { get; set; } = "";
    public string Organizer { get; set; } = "";
    public int Capacity { get; set; }
    public int RegisteredCount { get; set; }
    public string Category { get; set; } = "";
    public string ImageUrl { get; set; } = "";
}
