"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ModerationPage() {
  const [activeTab, setActiveTab] = useState("pending");

  // Mock data - replace with real data in your implementation
  const mockReports = [
    {
      id: "1",
      type: "content",
      status: "pending",
      reportedBy: "user@example.com",
      reason: "Inappropriate content",
      createdAt: new Date().toISOString(),
    },
    // Add more mock reports as needed
  ];

  return (
    <div className="space-y-6 p-8">
      <h1 className="text-2xl font-bold">Content Moderation</h1>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Reports</CardTitle>
              <CardDescription>
                Review and moderate reported content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <Badge>{report.type}</Badge>
                      </TableCell>
                      <TableCell>{report.reportedBy}</TableCell>
                      <TableCell>{report.reason}</TableCell>
                      <TableCell>
                        {new Date(report.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="space-x-2">
                          <Button size="sm" variant="destructive">
                            Remove
                          </Button>
                          <Button size="sm" variant="outline">
                            Approve
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Reports</CardTitle>
              <CardDescription>Previously moderated content</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for resolved reports */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
